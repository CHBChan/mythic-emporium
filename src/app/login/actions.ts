'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { accountInfo } from "../interface/interface";

import { createClient } from '@/utils/supabase/server'

export async function login(user: any) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const formDataObj = {
    email: user.username as string,
    password: user.password as string,
  }

  const { data, error } = await supabase.auth.signInWithPassword(formDataObj)

  if(data) {
    console.log(data);
  }
  if (error) {
    // redirect('/error')
    console.log(`Error in login actions.ts: ${error.message}`);
  }

  // revalidatePath('/', 'layout')
  revalidatePath('/')
  // redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    // redirect('/error')
    console.log(`Error in sign up actions.ts: ${error.message}`);
  }

  revalidatePath('/')
  redirect('/')
}