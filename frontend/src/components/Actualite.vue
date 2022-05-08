<template>
    <navigateur></navigateur>
    <h1>Dernières publications</h1>

    <section class="add-publication">
        <form @submit.prevent="createPost">
            <h2>Exprimez-vous...</h2>

            <div style="display:block">
                <img :src="imagePreview" alt="Prévisualisation de l'image ajoutée au message" class="newPost__content__image" id="preview"
                     style="display:block" v-if="imagePreview" />
            </div>
            <p>
                <label class="hidden" for="message">Votre contenu de publication</label>
                <textarea id="message" name="message" placeholder="Ajouter un texte" v-model="content"></textarea>
            </p>

            <p class="buttons">
                <button @click="uploadFile" class="btn2">Choisir une image</button>
                <input @change="onFileSelected" accept="image/*" aria-label="Sélectionner un fichier" class="btn" ref="fileUpload" title=" "
                       type="file">

                <button class="btn3" type="submit">Publier !</button>
            </p>
        </form>
    </section>

    <section :key="message.id" class="publications__list" v-for="message in messages">
        <article>
            <header>
                <img alt=""
                     src="https://previews.123rf.com/images/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg" />
                <div class="name">
                    <a>{{ message.User.prename }} {{ message.User.surname }}</a>
                    <span class="date">le {{message.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + message.createdAt.slice(11,16)}}</span>
                </div>
            </header>
            <main>
                <div v-if="message.attachment"><img :src="message.attachment" alt="..." /></div>
                <div class="description"><a>{{ message.content }}</a></div>
            </main>

            <div class="display__delete">
                <button aria-label="Supprimer le message" class="button_delete"
                        v-if="userId == message.idUSERS || isAdmin == 'true'" v-on:click="deleteMessage(message.id)">Supprimer la publication
                </button>
            </div>

            <footer>

                <h3>Commentaires <i @click="displayComment(message.id)"
                                    class="displayPost__button far fa-comment-dots"></i></h3>

                <div :key="comment.id" class="displayComment" v-for="comment in comments">
                    <div class="displayComment__item" v-bind:showComment="showComment"
                         v-if="showComment && message.id == comment.idPOSTS">
                        <div class="display__item">
                            <div class="displayComment__information">
                                <div class="displayComment__user">
                                    <img alt=""
                                         src="https://previews.123rf.com/images/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg" />
                                    <h3 class="displayComment__username"> {{ comment.User.prename }} {{
                                        comment.User.surname }}</h3>
                                </div>

                                <div>
                                    <span class="displayPost__date">Publié le {{comment.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + comment.createdAt.slice(11,16)}}</span>
                                </div>
                            </div>

                            <div class="displayPost__publication">
                                <p class="displayPost__text">{{ comment.content }}</p>
                            </div>
                            <div class="displayPost__item__option">
                                <i class="displayPost__item__option__button far fa-trash-alt"
                                   v-if="userId == comment.idUSERS || isAdmin == 'true'"
                                   v-on:click="deleteComment(comment.id)"></i>
                            </div>

                        </div>
                    </div>
                </div>

                <div :formId="message.id" class="comments">
                    <div class="add-comments">
                        <img alt=""
                             src="https://previews.123rf.com/images/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg">
                        <form @submit.prevent="createComment(message.id)" class="form-comment">
                            <textarea aria-label="Rédiger un nouveau commentaire" class="displayComment" id="comment" name="comment"
                                      placeholder="Ecrivez votre commentaire ..."
                                      v-model="contentComment" />

                            <div>
                                <button aria-label="Publier le commentaire"
                                        class="displayComment__newComment__form__button"><i class="far fa-paper-plane"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </footer>
        </article>
    </section>

</template>

<script>
    import axios from 'axios';
    import Navigateur from "./Navigateur";

    export default {
        name: "Actualite",
        components: {
            Navigateur
        },

        data() {
            return {
                userId: localStorage.getItem('userId'),
                idUSERS: localStorage.getItem('idUSERS'),
                prename: localStorage.getItem('prename'),
                surname: localStorage.getItem('surname'),
                isAdmin: localStorage.getItem('isAdmin'),
                messages: [],
                message: '',
                attachment: '',
                imagePreview: null,
                content: '',
                comments: [],
                contentComment: '',
                showComment: false,
                revele: false,
            }
        },

        created() {
            this.displayMessage();
        },

        methods: {


            displayModale() {
                this.revele = !this.revele
            },


            // Permet de créer un nouveau message
            uploadFile() {
                this.$refs.fileUpload.click()
            },
            onFileSelected(event) {
                this.attachment = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.attachment);
            },
            createPost() {
                const formData = new FormData();
                formData.append("content", this.content);
                formData.append("image", this.attachment);

                axios.post('http://localhost:3000/api/message', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },

            //Permet d'afficher tous les messages
            displayMessage() {
                axios.get('http://localhost:3000/api/message', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        this.messages = response.data
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },

            // Permet de supprimer un message
            deleteMessage(id) {
                const messageId = id;

                axios.delete('http://localhost:3000/api/message/' + messageId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        this.displayMessage();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },


            createComment(id) {
                const messageId = id;

                axios.post('http://localhost:3000/api/comment/' + messageId, {
                    content: this.contentComment,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },

            // Permet d'afficher les commentaires d'un message
            displayComment(id) {
                this.showComment = !this.showComment;
                const messageId = id;

                axios.get('http://localhost:3000/api/comment/' + messageId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        this.comments = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },

            // Permet de supprimer un commentaire
            deleteComment(id) {
                const commentId = id;
                axios.delete('http://localhost:3000/api/comment/' + commentId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

        }
    }

</script>

<style scoped>

    h1 {
        text-align: center;
        margin-top: 2%;
    }

    #preview {
        max-width: 50rem;
        width: 90%;
        height: 274px;
        margin: 1rem auto;
        object-fit: cover;
    }

    .add-publication form {
        background: #C7E0F6;
        box-shadow: #6BB0EC;
        border-radius: 10px;
        overflow: hidden;
        margin: 2em auto;
        max-width: 800px;
        padding: 1em 2em;
        border: 1px solid #6BB0EC;
    }

    .add-publication button {
        background: #A5CCED;
        padding: 0.5em 1.5em;
        border: none;
        border-top: 1px solid #6BB0EC;
        border-bottom: 1px solid #6BB0EC;
    }

    .btn {
        color: #3f3d56;
        border: none;
        background-color: #A5CCED;
    }

    .btn2 {
        display: none;
    }

    .btn3 {
        float: right;
    }

    .add-publication textarea {
        width: 100%;
        height: 7em;
        margin: 1em 0;
        padding: 1em;
        resize: none;
    }

    article {
        background: #C7E0F6;
        box-shadow: #6BB0EC;
        border-radius: 10px;
        overflow: hidden;
        margin: 2em auto;
        max-width: 800px;
        border: 1px solid #6BB0EC;
    }

    header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
    }

    header img {
        width: 80px;
        margin-right: 20px;
    }

    header .date {
        float: right;
    }

    .name {
        flex-grow: 2;
        font-weight: bold;
        color: $color-primary;
    }

    main img {
        width: 100%;
        padding: 1em 2em;
    }

    main .description {
        padding: 1em 2em;
    }

    .publications__list button {
        padding: 0.5em;
        width: 50%;
        background: #A5CCED;
        border: none;
        border-top: 1px solid #6BB0EC;
        border-bottom: 1px solid #6BB0EC;
    }

    .button_delete:hover, .button_delete:focus {
        color: black;
        background: #ff6363;
    }

    .comments {
        padding: 1em 2em;
    }

    .comments .title span {
        font-weight: bold;
    }

    .comments img {
        width: 60px;
        border-radius: 50%;
        float: left;
        margin-right: 1em;
    }

    .form-comment {
        display: flex;
        justify-content: space-between;
        margin: 2em;
    }

    .comments textarea {
        width: 100%;
        resize: none;
    }

    .comments button {
        background: #A5CCED;
        border-left: none;
        height: 4rem;
        width: 4rem;
        font-size: 1.2em;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .displayComment {
        display: flex;
        flex-direction: column;
    }

    .displayComment__user {
        display: flex;
        align-items: center;
    }

    .displayComment__user img {
        width: 40px;
        border-radius: 50%;
        float: left;
        margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    }

    .displayComment__username {
        margin-bottom: 0.2rem;
        font-size: 22px;
    }

    .displayComment__information {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .displayPost__publication {
        display: flex;
        flex-direction: column;
        margin: 0.5rem 2rem;
    }

    .displayPost__text {
        text-align: left;
        margin: 0;
    }

    .displayPost__date {
        display: flex;
        justify-content: flex-end;
    }

    .displayPost__button:hover, .displayPost__button:focus {
        color: #6BB0EC;
        cursor: pointer;
    }

    .display__item {
        display: flex;
        flex-direction: column;
        border: 2px solid #6BB0EC;
        border-radius: 25px;
        margin: auto;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 90%;
    }

    h3 {
        padding-left: 1em;
    }

    .display__delete {
        display: flex;
        justify-content: center;
        margin-bottom: 1em;
    }

    .displayPost__item__option {
        display: flex;
        justify-content: right;
    }

    .displayPost__item__option__button:hover, displayPost__item__option__button:focus {
        color: #ff6363;
        cursor: pointer;
    }

</style>

