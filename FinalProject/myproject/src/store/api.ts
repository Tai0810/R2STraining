export async function fetchJson(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
}

export async function updateJson(
  url: string,
  body: any,
  method: "PUT" | "POST" | "PATCH" = "POST"
) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to ${method} data to ${url}`, error);
    throw error;
  }
}

export async function deleteJson(url: string, id: string | number) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete resource with id ${id}`, error);
    throw error;
  }
}
