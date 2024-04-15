import { SupabaseClient, createClient } from '@supabase/supabase-js';

export class SupabaseHelper {
  private static supabaseClient: SupabaseClient;

  private constructor() {
    SupabaseHelper.supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  static getClientInstance(): SupabaseClient {
    if (!SupabaseHelper.supabaseClient) {
      new SupabaseHelper();
    }

    return SupabaseHelper.supabaseClient;
  }

  static async uploadImage(path: string, buffer: Buffer) {
    const { data, error } = await SupabaseHelper.getClientInstance()
      .storage.from(process.env.SUPABASE_BUCKET)
      .upload(path, buffer);

    if (error) {
      throw new Error(
        `Failed to upload image by exception ${JSON.stringify(error)}`,
      );
    }

    return data;
  }

  static async getImagePublicURl(path: string) {
    const { data } = SupabaseHelper.getClientInstance()
      .storage.from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}
