<template>
    <div class="bg">
        <div class="container">
            <div class="row">
                <nav class="col navbar navbar-expand-lg">
                    <a class="navbar-brand">
                        <routerLink to="/Actualite"><img alt="Logo de Groupomania" class="logo"
                                                         src="@/assets/logo11.png"></routerLink>
                    </a>
                    <a class="navbar-brand ml-auto">
                        <router-link to="/Profil"><i class="fas fa-user"></i></router-link>
                    </a>
                    <a class="navbar-brand">
                        <ModaleLogout v-bind:displayModale='displayModale' v-bind:revele="revele" />
                        <button @click="displayModale" class="logout">Déconnexion <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </a>
                </nav>
            </div>
        </div>
    </div>

    <div class="modaleBloc" v-if="revele">
        <div @click="displayModale" class="modaleBloc__overlay"></div>

        <div class="modaleBloc__card">
            <div class="modaleBloc__card__title">
                <h2>Souhaitez-vous vraiment vous déconnecter ?</h2>

                <div class="modaleBloc__card__title__close">
                    <i @click="displayModale" aria-label="Fermer la fenêtre"
                       class="far fa-times-circle fa-2x modaleBloc__card__title__close"></i>
                </div>
            </div>

            <button @click="logout" aria-label="Se déconnecter" class="modaleBloc__card__button">Oui, je me déconnecte
                <i class="fas fa-sign-out-alt"></i></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navigateur",

        data() {
            return {
                revele: false
            }
        },

        methods: {
            displayModale() {
                this.revele = !this.revele
            },

            logout() {
                // Permet de se déconnecter
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('imageProfile');

                this.$router.push('http://localhost:8080/');
            }
        }
    }

</script>

<style scoped>

    img {
        max-width: 150px;
        max-height: 750px;
    }

    .bg {
        background-color: #A5CCED;
    }

    .navbar {
        background-color: #A5CCED;
    }

    .logout {
        border: none;
        background-color: #6BB0EC;
    }

    .modaleBloc {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .modaleBloc__overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modaleBloc__card {
        z-index: 2;
        position: fixed;
        background: #A5CCED;
        color: #3f3d56;
    }

    .modaleBloc__card__title {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 3rem 6rem 1.5rem 6rem;
    }

    .modaleBloc__card__title__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: #3f3d56;
    }

    .modaleBloc__card__title__close:hover, .modaleBloc__card__title__close:focus {
        color: #ff6363;
    }

    .modaleBloc__card__button {
        margin-left: 35%;
        margin-bottom: 1em;
        border: 3px solid #3f3d56;
        border-radius: 25px;
        color: #3f3d56;
        font-size: 15px;
        font-weight: bold;
        padding: 0.9rem;
        outline-style: none;
    }

</style>
