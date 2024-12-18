import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId: string) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/follow/${userId}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }), // Clear when followed
        queryClient.invalidateQueries({ queryKey: ["authCheck"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { follow, isPending };
};

export default useFollow;
