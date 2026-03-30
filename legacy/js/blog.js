// Blog Logic - Supabase Version

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the list page or single post page
    const isSinglePost = document.getElementById('blog-post-content');

    if (isSinglePost) {
        initSinglePost();
    } else {
        initBlogList();
    }
});

/**
 * --- LIST PAGE LOGIC ---
 */
let allPosts = []; // Store all posts locally for filtering
let currentCategory = '';
let currentSearch = '';
const POSTS_PER_PAGE = 6;
let currentPage = 1;

async function initBlogList() {
    const grid = document.getElementById('blog-grid');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!grid) return; // Safety check

    // Fetch all posts once
    await fetchAllPosts();

    // Event Listeners
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                currentSearch = e.target.value.trim().toLowerCase();
                resetAndRender();
            }, 300);
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            resetAndRender();
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            renderPosts(); // Render next page
        });
    }
}

async function fetchAllPosts() {
    showLoader(true);
    try {
        const { data, error } = await window.supabaseClient
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allPosts = data || [];
        renderPosts();
    } catch (error) {
        console.error('Error fetching posts:', error);
        const grid = document.getElementById('blog-grid');
        grid.innerHTML = '<p style="color:white; text-align:center; grid-column: 1/-1;">Failed to load blog posts. Check Supabase connection.</p>';
    } finally {
        showLoader(false);
    }
}

function resetAndRender() {
    currentPage = 1;
    const grid = document.getElementById('blog-grid');
    if (grid) grid.innerHTML = '';
    renderPosts();
}

function getFilteredPosts() {
    return allPosts.filter(post => {
        const matchesCategory = currentCategory ? post.category === currentCategory : true;
        const matchesSearch = currentSearch ?
            (post.title.toLowerCase().includes(currentSearch) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(currentSearch)))
            : true;
        return matchesCategory && matchesSearch;
    });
}

function renderPosts() {
    const grid = document.getElementById('blog-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');

    const filtered = getFilteredPosts();
    const end = currentPage * POSTS_PER_PAGE;
    const recordsToShow = filtered.slice(0, end);

    if (grid) {
        grid.innerHTML = '';
        if (recordsToShow.length === 0) {
            grid.innerHTML = '<p style="color:white; text-align:center; grid-column: 1/-1;">No posts found.</p>';
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        recordsToShow.forEach(post => {
            const card = document.createElement('article');
            card.className = 'blog-card';

            const imageUrl = post.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800';
            const date = new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            const slug = post.id; // Using ID as slug

            card.innerHTML = `
                <img src="${imageUrl}" alt="${post.title}" class="blog-card-image" loading="lazy">
                <div class="blog-card-content">
                    <div class="blog-category">${post.category || 'General'}</div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt || ''}</p>
                    <div class="blog-footer">
                        <span class="blog-date">${date}</span>
                        <a href="blog-post.html?id=${slug}" class="blog-read-more">Read More &rarr;</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Handle Load More Button Visibility
    if (loadMoreBtn) {
        loadMoreBtn.style.display = (end < filtered.length) ? 'block' : 'none';
    }
}

/**
 * --- SINGLE POST PAGE LOGIC ---
 */
async function initSinglePost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        window.location.href = 'blog.html';
        return;
    }

    showLoader(true);
    try {
        const { data, error } = await window.supabaseClient
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();

        if (error) throw error;

        renderSinglePost(data);

        // Load related posts (optional, but keep for feature parity)
        loadRelatedPosts(data.id, data.category);

    } catch (error) {
        console.error('Error fetching post:', error);
        document.getElementById('blog-post-content').innerHTML = `
            <div style="text-align:center; padding: 100px 0;">
                <h2>Post not found</h2>
                <a href="blog.html" class="btn-black" style="margin-top:20px;">Back to Blog</a>
            </div>
        `;
    } finally {
        showLoader(false);
    }
}

function renderSinglePost(post) {
    document.title = `${post.title} | GrowthLab Blog`;

    const imgContainer = document.getElementById('post-image');
    if (post.image_url) {
        imgContainer.src = post.image_url;
        imgContainer.alt = post.title;
        imgContainer.style.display = 'block';
    } else {
        imgContainer.style.display = 'none';
    }

    document.getElementById('post-category').textContent = post.category || 'General';
    const date = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('post-date').textContent = date;
    document.getElementById('post-author').textContent = `By GrowthLab Team`;

    document.getElementById('post-title').textContent = post.title;

    // Format content: if it doesn't contain HTML tags (like <p>), format the plain text with paragraphs
    let content = post.content || '';
    if (content && !content.includes('<p>') && !content.includes('<h1>')) {
        content = content.split('\n\n').map(p => {
            const text = p.trim();
            if (!text) return '';
            // Make bold headers for short lines that don't end in punctuation
            if (text.length < 60 && !text.match(/[.!?]$/)) {
                return `<h2>${text}</h2>`;
            }
            return `<p>${text}</p>`;
        }).join('');
    }

    document.getElementById('post-body').innerHTML = content;

    // Force links to be clickable in case of CSS overlay issues
    setTimeout(() => {
        const postLinks = document.querySelectorAll('#post-body a');
        postLinks.forEach(link => {
            link.style.position = 'relative';
            link.style.zIndex = '9999';
            link.style.pointerEvents = 'auto';
            link.addEventListener('click', (e) => {
                // If it's not a hash link, ensure it navigates
                if (link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
                    e.stopPropagation(); // prevent parent elements from blocking
                }
            });
        });
    }, 100);

    // Social Share Links
    const currentUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(post.title);

    const liShare = document.getElementById('share-linkedin');
    if (liShare) liShare.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;

    const twShare = document.getElementById('share-twitter');
    if (twShare) twShare.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;

    const fbShare = document.getElementById('share-facebook');
    if (fbShare) fbShare.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
}

async function loadRelatedPosts(currentId, category) {
    if (!category) return;

    try {
        const { data, error } = await window.supabaseClient
            .from('posts')
            .select('*')
            .eq('category', category)
            .neq('id', currentId)
            .limit(3);

        if (error) throw error;
        if (!data || data.length === 0) return;

        const container = document.createElement('div');
        container.className = 'container related-posts-container';
        container.style.marginTop = '60px';
        container.innerHTML = '<h3 style="margin-bottom:30px; font-size:28px;">Related Articles</h3><div class="blog-grid" id="related-grid"></div>';

        const contentDiv = document.getElementById('blog-post-content');
        if (contentDiv) contentDiv.appendChild(container);

        const grid = document.getElementById('related-grid');

        data.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-card';

            const imageUrl = post.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800';
            const date = new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            card.innerHTML = `
                <img src="${imageUrl}" class="blog-card-image" alt="${post.title}" loading="lazy">
                <div class="blog-card-content">
                    <div class="blog-category">${post.category || ''}</div>
                    <h3>${post.title}</h3>
                    <div class="blog-footer">
                            <span class="blog-date">${date}</span>
                            <a href="blog-post.html?id=${post.id}" class="blog-read-more">Read More &rarr;</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        console.warn('Could not load related posts', err);
    }
}

function showLoader(show) {
    const loader = document.getElementById('loading-spinner');
    if (loader) loader.style.display = show ? 'flex' : 'none';
}
