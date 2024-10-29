import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface FormData {
  fullName?: string;
  userName?: string;
  profileImg?: string | null;
  email?: string;
  bio?: string;
  newPassword?: string;
  currentPassword?: string;
}

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (formData: FormData) => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/update`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(formData),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }
          return data;
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in useUpdateUserProfile:", error.message);
            toast.error(error.message);
          } else {
            console.error("Unknown error occurred");
            toast.error("Unknown error occurred");
          }
        }
      },
      onSuccess: () => {
        toast.success("Profile updated successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        ]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;
