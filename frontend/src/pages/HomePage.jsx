import { useFetch } from '../hooks/useFetch';

export const HomePage = () => {
    const { data: articles, isLoading, error } = useFetch('http://localhost:3000/api/articles');

    if (isLoading) {
        return (
        <div>
            <p>Cargando artículos...</p>
        </div>
        )
    }

    if (!articles || articles.length === 0) {
        return (
            <div>
                <p>No se encontraron artículos.</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Artículos</h1>
            <div>
                {articles.map((article) => (
                    <article key={article.id} className="article">
                        <h2>{article.title}</h2>
                        <p>{article.excerpt}</p>
                        <p>{article.user_id}</p>
                    </article>
                ))}
            </div>
        </div>
    )
}