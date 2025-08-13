import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

interface GenerateScriptRequest {
  topic: string;
  language: string;
}

interface GenerateScriptResponse {
  content: string;
}

const generateScript = async (data: GenerateScriptRequest): Promise<GenerateScriptResponse> => {
  const response = await apiClient.post('/api/generate-script', data);
  return response.data;
};

export const useGenerateScript = () => {
  return useMutation({
    mutationFn: generateScript,
    onSuccess: (data) => {
      console.log('Script generated successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to generate script:', error);
    },
  });
};