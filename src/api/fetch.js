export default async function(...args) {
    const apiKey = "4008963540";
    const res = await fetch(...args);
    return await res.json();
}