"use server"
export const getFreelancers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancers`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch freelancers");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    throw error;
  }
};