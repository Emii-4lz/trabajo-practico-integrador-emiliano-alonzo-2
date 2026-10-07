import { useFetch } from '../hooks/useFetch';

export const HomePage = () => {
    const { data: articles, isLoading, error } = useFetch('http://localhost:3000/api/articles');

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-4 mt-6 text-center">
                <p className="text-gray-600">Cargando artículos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4 mt-6 text-center">
                <p className="text-red-500">Error al cargar los artículos: {error}</p>
            </div>
        );
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-4 mt-6 text-center">
                <p className="text-gray-600">No se encontraron artículos.</p>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto p-4 mt-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Últimos Artículos</h1>
            <div className="flex flex-col gap-6">
                {articles.map((article) => (
                    <article key={article.id} className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md bg-white">
                        <h2 className="text-2xl font-bold text-blue-900 mb-2">{article.title}</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Por: <span className="font-semibold">{article.author?.username || (typeof article.author === 'string' ? article.author : 'Anónimo')}</span>
                        </p>
                        <p className="text-gray-700">{article.excerpt || article.content}</p>
                    </article>
                ))}
            </div>
        </main>
    );
};