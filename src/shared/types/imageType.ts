export interface PostImagePresignedRequest {
  contenType: string;
  md5: string;
}

export interface PostImagePresignedResponse {
  imagePath: string;
  presignedUrl: string;
}