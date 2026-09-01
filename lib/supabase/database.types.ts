export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      books: { Row: {
        id:string; category_id:string|null; title:string; slug:string; author:string;
        description:string|null; cover_path:string|null; ebook_path:string|null;
        format:string; access_type:string; is_published:boolean; featured:boolean;
        published_at:string|null; created_at:string; updated_at:string;
      }; Insert: Partial<Database["public"]["Tables"]["books"]["Row"]> & {title:string;slug:string;author:string};
        Update: Partial<Database["public"]["Tables"]["books"]["Row"]>; Relationships: [] };
      categories: { Row:{id:string;name:string;slug:string;description:string|null;created_at:string};
        Insert:{id?:string;name:string;slug:string;description?:string|null;created_at?:string};
        Update:Partial<Database["public"]["Tables"]["categories"]["Insert"]>; Relationships:[] };
      user_books: { Row:{user_id:string;book_id:string;progress_seconds:number;progress_percent:number;last_read_at:string|null;created_at:string;updated_at:string};
        Insert:Partial<Database["public"]["Tables"]["user_books"]["Row"]> & {user_id:string;book_id:string};
        Update:Partial<Database["public"]["Tables"]["user_books"]["Row"]>; Relationships:[] };
      favorites: { Row:{user_id:string;book_id:string;created_at:string};
        Insert:{user_id:string;book_id:string;created_at?:string}; Update:Partial<Database["public"]["Tables"]["favorites"]["Insert"]>; Relationships:[] };
      profiles: { Row:{id:string;full_name:string|null;username:string|null;avatar_path:string|null;created_at:string;updated_at:string};
        Insert:Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {id:string};
        Update:Partial<Database["public"]["Tables"]["profiles"]["Insert"]>; Relationships:[] };
      user_roles: { Row:{user_id:string;role:string;created_at:string};
        Insert:{user_id:string;role?:string;created_at?:string}; Update:Partial<Database["public"]["Tables"]["user_roles"]["Insert"]>; Relationships:[] };
    };
  };
}
