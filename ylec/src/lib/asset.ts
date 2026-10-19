/** Préfixe un chemin de /public avec la base de publication (utile en sous-dossier). */
export const asset = (src: string) => (src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src)
