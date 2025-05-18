import { useState, useMemo } from 'react';

export default function useVetAdviceLogic(initialPosts) {
    const [posts, setPosts] = useState(initialPosts);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const currentPosts = useMemo(() => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return posts.slice(indexOfFirstPost, indexOfLastPost);
    }, [posts, currentPage]);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const addPost = (newPost) => {
        setPosts(prev => [newPost, ...prev]);
        // Jeśli dodajemy post na pełnej stronie, przejdź do pierwszej strony
        if (posts.length % postsPerPage === 0) {
            setCurrentPage(1);
        }
    };

    return {
        posts,
        currentPosts,
        currentPage,
        totalPages,
        paginate,
        addPost,
        setPosts
    };
}