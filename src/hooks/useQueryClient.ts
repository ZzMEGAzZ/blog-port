import { useQueryClient as useOriginalQueryClient } from '@tanstack/react-query';

export const useQueryClient = () => {
    const queryClient = useOriginalQueryClient();
    return queryClient;
};
