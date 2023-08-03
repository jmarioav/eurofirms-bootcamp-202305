function Home({ onLogout }) {
    console.log ('tamos en home')
    const [modal, setModal] = React.useState(null)
    const [idPost, setIdPost] = React.useState(null)
    const [userLogged, setUserLogged] = React.useState(null)
    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        try {
            Promise.all([retrieveUser(context.tokenUser), retrievePosts(context.tokenUser)])
                .then(([user, posts]) => {
                    setUserLogged(user)
                    setPosts(posts)
                })
                .catch(err => alert('Error: ' + err.message))

        } catch (err) { alert('Error: ' + err.message) }
    }, [])

    const handleCreateModal = () => setModal('create-modal')
    const handleEditModal = (idPost) => {
        setIdPost(idPost)
        setModal('edit-modal')
    }
    const handleDeleteModal = (idPost) => {
        setIdPost(idPost)
        setModal('delete-modal')
    }
    const handleExitModal = () => {
        setIdPost(null)
        setModal(null)
    }
    const handleLogout = () => {
        context.tokenUser = null
        onLogout()
    }
    const handleRefreshPostsExitModal = () => {
        try {
            retrievePosts(context.tokenUser)
                .then(posts => {
                    setPosts(posts)
                    setModal(null)
                    setIdPost(null)
                })
                .catch(error => alert('Error: ' + error.message))
        } catch (error) { alert('Error: ' + error.message) }
    }

const userId = decodeJsonWebToken(context.tokenUser)

    return (
        <div className="home">
            <header className="home-header flex-hor">
                <div className="basic-head">
                    <h3 className="greetings">Hola, {userLogged ? userLogged.name : 'mundo'}</h3>
                </div>
            </header>

            <main className="home-view">
                <section className="posts-list basic-container">
                    {posts && posts.map(post => <article className="post-item" key={post.id}>
                        <img className="post-item-image" src={post.image} alt="Foto de Post" />
                        <p className="post-item-text">{post.text}</p>
                        <p className="post-item-user">{post.author.name}</p>

                        {post.author.id === userId && <>
                            <button className="post-item-button" type="button" onClick={() => handleEditModal(post.id)}>Editar</button>
                            <button className="post-item-button" type="button" onClick={() => handleDeleteModal(post.id)}>Borrar</button>
                        </>}
                    </article>)}
                </section>
            </main>

            <footer className="home-nav">
                <div className="basic-nav">
                    <button type="button" className="button-newpost basic-button" onClick={handleCreateModal}>Nuevo Post</button>
                    <button type="button" className="button-logout basic-button" onClick={handleLogout}>Salir</button>
                </div>
            </footer>

            {modal === 'create-modal' && <PostCreate onCreatedPost={handleRefreshPostsExitModal} onExitModal={handleExitModal} />}
            {modal === 'edit-modal' && <PostEdit onUpdatedPost={handleRefreshPostsExitModal} onExitModal={handleExitModal} idPost={idPost} />}
            {modal === 'delete-modal' && <PostDelete onDeletedPost={handleRefreshPostsExitModal} onExitModal={handleExitModal} idPost={idPost} />}
        </div>
    )
}