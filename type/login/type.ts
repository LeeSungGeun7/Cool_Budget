export type SignInResponse = {
    status: 'success' | 'error';
    error?: string;
    ok?: boolean;
    url?: string; 

  }  




  export interface Image {
    result: ImageResult
    success: boolean
    errors: any[]
    messages: any[]
  }
  
  export interface ImageResult {
    id: string
    filename: string
    uploaded: string
    requireSignedURLs: boolean
    variants: string[]
  }