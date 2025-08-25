import supabase from "./supabaseClient.js";

export const uploadToStorage = async (path, fileBuffer) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(path, fileBuffer, { upsert: true });

  if (error) throw error;
  return data;
};

export const listFromStorage = async (folder) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .list(folder);

  if (error) throw error;
  return data;
};

export const deleteFromStorage = async (path) => {
  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .remove([path]);

  if (error) throw error;
};
