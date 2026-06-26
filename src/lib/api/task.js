const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClientTasks = async (clientId) => {
    // একদম ক্লিন এবং স্ট্যান্ডার্ড নিয়ম
    const res = await fetch(`${baseUrl}/api/tasks/${clientId}`);
    return res.json();
}