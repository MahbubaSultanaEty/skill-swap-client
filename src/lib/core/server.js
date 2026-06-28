const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
     if (!res.ok) return null;
    // handle 401, 402, 404
    return res.json()
}

export const serverMutation = async (path, data , method= "POST") => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    // handle 401, 404, 403

    return res.json();
 }