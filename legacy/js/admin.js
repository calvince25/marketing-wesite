// Admin Dashboard Logic

const ADMIN_PASSWORD = 'password'; // Simple password for demonstration

document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    initAdmin();
});

// --- AUTHENTICATION ---
function checkAuth() {
    const pwdInput = document.getElementById('admin-password');
    const errorMsg = document.getElementById('login-error');

    if (pwdInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('login-screen').style.display = 'none';
        initAdmin();
    } else {
        errorMsg.style.display = 'block';
    }
}

function checkSession() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('login-screen').style.display = 'none';
    }
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.reload();
}

// --- ADMIN LOGIC ---
let posts = [];
let quill;

async function initAdmin() {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') return;

    await fetchPosts();

    // Initialize Quill editor
    if (!quill) {
        quill = new Quill('#editor-container', {
            theme: 'snow',
            placeholder: 'Write your full article content here...',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    ['link', 'image', 'video'],
                    ['clean']
                ]
            }
        });
    }

    const form = document.getElementById('post-form');
    form.addEventListener('submit', handleFormSubmit);
}

async function fetchPosts() {
    showLoader(true);
    try {
        const { data, error } = await window.supabaseClient
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        posts = data || [];
        renderPostsTable();
    } catch (error) {
        console.error('Detailed Error:', error);
        alert('Failed to load posts: ' + (error.message || 'Unknown error') + '\n\nCheck the console for more details.');
    } finally {
        showLoader(false);
    }
}

function renderPostsTable() {
    const list = document.getElementById('admin-posts-list');
    list.innerHTML = '';

    posts.forEach(post => {
        const tr = document.createElement('tr');
        const date = new Date(post.created_at).toLocaleDateString();

        tr.innerHTML = `
            <td style="font-weight: 600;">${post.title}</td>
            <td>${post.category}</td>
            <td>${date}</td>
            <td>
                <button class="btn-admin btn-outline" onclick="editPost('${post.id}')" style="margin-right: 5px;">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn-admin btn-danger" onclick="deletePost('${post.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(tr);
    });
}

// --- MODAL & FORM ---
function openModal(postId = null) {
    const modal = document.getElementById('post-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('post-form');

    form.reset();
    document.getElementById('post-id').value = '';

    if (quill) {
        quill.root.innerHTML = '';
    }

    if (postId) {
        const post = posts.find(p => String(p.id) === String(postId));
        if (post) {
            title.textContent = 'Edit Post';
            document.getElementById('post-id').value = post.id;
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-image').value = post.image_url;
            document.getElementById('post-excerpt').value = post.excerpt;
            if (quill) quill.root.innerHTML = post.content || '';
        }
    } else {
        title.textContent = 'Create New Post';
    }

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('post-modal').style.display = 'none';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const saveBtn = document.getElementById('save-btn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    const id = document.getElementById('post-id').value;
    const postData = {
        title: document.getElementById('post-title').value,
        category: document.getElementById('post-category').value,
        image_url: document.getElementById('post-image').value,
        excerpt: document.getElementById('post-excerpt').value,
        content: quill ? quill.root.innerHTML : '',
        updated_at: new Date().toISOString()
    };

    try {
        let error;
        if (id) {
            // Update
            const { error: err } = await window.supabaseClient
                .from('posts')
                .update(postData)
                .eq('id', id);
            error = err;
        } else {
            // Create
            const { error: err } = await window.supabaseClient
                .from('posts')
                .insert([postData]);
            error = err;
        }

        if (error) throw error;

        closeModal();
        await fetchPosts();
    } catch (error) {
        console.error('Error saving:', error);
        alert('Error saving post: ' + error.message);
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Post';
    }
}

function editPost(id) {
    openModal(id);
}

async function deletePost(id) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        const { error } = await window.supabaseClient
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        await fetchPosts();
    } catch (error) {
        console.error('Error deleting:', error);
        alert('Error deleting post: ' + error.message);
    }
}

function showLoader(show) {
    document.getElementById('admin-loader').style.display = show ? 'block' : 'none';
    document.getElementById('admin-posts-list').style.opacity = show ? '0.3' : '1';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('post-modal');
    if (event.target == modal) {
        closeModal();
    }
};
