import { createClient } from '@supabase/supabase-js';
import { db } from '@/lib/db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder') && supabaseUrl !== '');

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helpers to normalise slugs and fields
const normalizeSlug = (slug: any) => {
  if (typeof slug === 'string') {
    return { current: slug };
  }
  if (slug && typeof slug === 'object') {
    return slug;
  }
  return { current: '' };
};

export async function getProjects(): Promise<any[]> {
  if (!isSupabaseConfigured || !supabase) {
    await db.loadTable('projects');
    return db.read('projects');
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('displayOrder', { ascending: true });

    if (error) {
      console.error('Supabase getProjects error:', error);
      await db.loadTable('projects');
      return db.read('projects');
    }

    // Auto-seed to Supabase if it is empty
    if (!data || data.length === 0) {
      console.log('Supabase projects table is empty, auto-seeding local projects...');
      await db.loadTable('projects');
      const localProjects = db.read('projects');
      if (localProjects.length > 0) {
        const formatted = localProjects.map((p: any) => ({
          name: p.name || p.title,
          title: p.name || p.title,
          slug: typeof p.slug === 'object' ? p.slug.current : p.slug,
          description: p.description,
          fullDescription: p.fullDescription || p.description,
          technologies: p.technologies || [],
          client: p.client || '',
          images: p.images || [],
          projectLink: p.projectLink || p.link || '',
          githubLink: p.githubLink || '',
          featured: !!p.featured,
          isPrivate: !!p.isPrivate,
          completionDate: p.completionDate || new Date().toISOString().split('T')[0],
          displayOrder: p.displayOrder || 0,
          status: p.status || 'Published'
        }));
        const { data: inserted, error: insertError } = await supabase
          .from('projects')
          .insert(formatted)
          .select();
        if (!insertError && inserted) {
          return inserted.map((p: any) => ({
            ...p,
            id: p.id,
            _id: p.id,
            slug: normalizeSlug(p.slug)
          }));
        }
        console.error('Seeding Supabase projects failed:', insertError);
      }
    }

    return (data || []).map((p: any) => ({
      ...p,
      id: p.id,
      _id: p.id,
      slug: normalizeSlug(p.slug)
    }));
  } catch (e) {
    console.error('Error fetching from Supabase, falling back:', e);
    await db.loadTable('projects');
    return db.read('projects');
  }
}

export async function getProjectBySlug(slug: string): Promise<any | null> {
  if (!isSupabaseConfigured || !supabase) {
    await db.loadTable('projects');
    const proj = db.findOne('projects', (p: any) => (p.slug?.current || p.slug) === slug);
    if (!proj) return null;
    return {
      ...proj,
      slug: normalizeSlug(proj.slug)
    };
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase getProjectBySlug error:', error);
      await db.loadTable('projects');
      const proj = db.findOne('projects', (p: any) => (p.slug?.current || p.slug) === slug);
      if (!proj) return null;
      return {
        ...proj,
        slug: normalizeSlug(proj.slug)
      };
    }

    if (!data) return null;

    return {
      ...data,
      id: data.id,
      _id: data.id,
      slug: normalizeSlug(data.slug)
    };
  } catch (e) {
    console.error('Error fetching project by slug from Supabase:', e);
    await db.loadTable('projects');
    const proj = db.findOne('projects', (p: any) => (p.slug?.current || p.slug) === slug);
    if (!proj) return null;
    return {
      ...proj,
      slug: normalizeSlug(proj.slug)
    };
  }
}

export async function insertProject(project: any): Promise<any> {
  if (!isSupabaseConfigured || !supabase) {
    await db.loadTable('projects');
    const newProj = {
      ...project,
      slug: typeof project.slug === 'object' ? project.slug : { current: project.slug }
    };
    return db.insert('projects', newProj);
  }

  const formatted = {
    name: project.name || project.title,
    title: project.name || project.title,
    slug: typeof project.slug === 'object' ? project.slug.current : project.slug,
    description: project.description,
    fullDescription: project.fullDescription || '',
    technologies: Array.isArray(project.technologies) ? project.technologies : [],
    client: project.client || '',
    images: Array.isArray(project.images) ? project.images : [],
    projectLink: project.projectLink || '',
    githubLink: project.githubLink || '',
    featured: !!project.featured,
    isPrivate: !!project.isPrivate,
    completionDate: project.completionDate || new Date().toISOString().split('T')[0],
    displayOrder: parseInt(project.displayOrder) || 0,
    status: project.status || 'Published',
    seo: project.seo || { metaTitle: `${project.name} Project`, metaDescription: project.description.substring(0, 160) }
  };

  const { data, error } = await supabase
    .from('projects')
    .insert(formatted)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    id: data.id,
    _id: data.id,
    slug: normalizeSlug(data.slug)
  };
}

export async function updateProject(id: string, updates: any): Promise<any> {
  if (!isSupabaseConfigured || !supabase) {
    await db.loadTable('projects');
    return db.update('projects', id, updates);
  }

  const formatted: any = {};
  if (updates.name !== undefined) {
    formatted.name = updates.name;
    formatted.title = updates.name;
  }
  if (updates.slug !== undefined) {
    formatted.slug = typeof updates.slug === 'object' ? updates.slug.current : updates.slug;
  }
  if (updates.description !== undefined) formatted.description = updates.description;
  if (updates.fullDescription !== undefined) formatted.fullDescription = updates.fullDescription;
  if (updates.technologies !== undefined) {
    formatted.technologies = Array.isArray(updates.technologies) ? updates.technologies : updates.technologies;
  }
  if (updates.client !== undefined) formatted.client = updates.client;
  if (updates.images !== undefined) {
    formatted.images = Array.isArray(updates.images) ? updates.images : updates.images;
  }
  if (updates.projectLink !== undefined) formatted.projectLink = updates.projectLink;
  if (updates.githubLink !== undefined) formatted.githubLink = updates.githubLink;
  if (updates.featured !== undefined) formatted.featured = !!updates.featured;
  if (updates.isPrivate !== undefined) formatted.isPrivate = !!updates.isPrivate;
  if (updates.completionDate !== undefined) formatted.completionDate = updates.completionDate;
  if (updates.displayOrder !== undefined) formatted.displayOrder = parseInt(updates.displayOrder) || 0;
  if (updates.status !== undefined) formatted.status = updates.status;
  if (updates.seo !== undefined) formatted.seo = updates.seo;

  const { data, error } = await supabase
    .from('projects')
    .update(formatted)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    id: data.id,
    _id: data.id,
    slug: normalizeSlug(data.slug)
  };
}

export async function deleteProject(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    await db.loadTable('projects');
    const success = db.delete('projects', id);
    if (!success) throw new Error('Project not found');
    return;
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function uploadImage(file: Buffer, fileName: string, mimeType: string): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    const fs = require('fs');
    const path = require('path');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const cleanFileName = Date.now() + '_' + fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(uploadsDir, cleanFileName);
    fs.writeFileSync(filePath, file);
    return `/uploads/${cleanFileName}`;
  }

  const cleanFileName = Date.now() + '_' + fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(cleanFileName, file, {
      contentType: mimeType,
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Supabase storage upload error:', error);
    throw new Error(error.message);
  }

  const { data: urlData } = supabase.storage
    .from('portfolio')
    .getPublicUrl(cleanFileName);

  return urlData.publicUrl;
}
