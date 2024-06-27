import supabase from "@/utils/supabase/client";

type Response = {
  id: number;
  email: string;
  name: string;
  username: string;
  password: string;
  created_at: string;
};

export async function createUser(
  email: string,
  name: string,
  username: string,
  hashedPassword: string,
) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, name, username, password: hashedPassword }])
    .select()
    .returns<Response>();

  if (error) {
    throw error;
  }

  return data;
}
