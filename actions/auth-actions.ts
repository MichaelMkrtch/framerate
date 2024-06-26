'use server'

type FormData = {
  name: string;
  email: string;
  username: string;
  password: string;
}

export async function signup(formData: FormData) {
  console.log(formData);
}