<template>
  <div id="app">
    <div class="search__block">
      <h3 :class="{ deactivate: isDeactivated }">{{ title }}</h3>
      <h6 :class="{ deactivate: isDeactivated }">created by {{ author }}</h6>
      <form @submit.prevent="formSubmitted()">
        <label for="searchTerm">Search image</label>
        <input v-model="searchTerm" class="" type="text" name="" id="searchTerm" />
        <button type="submit">search</button>
      </form>
      <h1 v-if="loading">loading...</h1>
    </div>
    <section :class="{ deactivate: !isDeactivated }" class="images">
      <div class="single__image" v-for="image in images" :key="image.id">
        <img @click="activateModal(image.id)" :src="image.urls.regular" :id="image.id" />
      </div>
    </section>
    <div :class="{ modal: isModalVisible }" class="modal__deactivated">
      <!-- <img :src="images.results" :id="image.id" /> -->
      <div class="modal__wrap">
        <div @keydown.space="deactivateModal()" @click="deactivateModal()" class="exit__Btn"></div>
        <img v-for="image in filterByID" :key="image.id" :src="image.urls.regular" />
        <h5 v-for="image in filterByID" :key="image.created_at" class="modal__description">
          Author: {{ image.user.first_name }} {{ image.user.last_name }} <br />
          Location: {{ image.user.location }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
const PROXY_URL = 'https://thawing-eyrie-82624.herokuapp.com/';
const API_URL = 'https://unsplash.com/napi/search/photos?per_page=50&query=';

export default {
  name: 'app',
  data() {
    return {
      title: 'Hand2Band Media interview photo search app',
      author: 'Marcin Michna',
      searchTerm: '',
      images: [],
      loading: false,
      isDeactivated: false,
      isModalVisible: false,
      modalId: '',
      modalImgUrl: '',
    };
  },

  methods: {
    async formSubmitted() {
      this.loading = true;
      this.images = [];
      try {
        const response = await fetch(`${PROXY_URL}${API_URL}${this.searchTerm}`);
        const data = await response.json();
        if (data.results.length === 0) {
          this.isDeactivated = false;
          this.loading = false;
        } else {
          this.loading = false;
          this.isDeactivated = true;
          this.images = data.results;
        }
      } catch (err) {
        this.isDeactivated = false;
      }
    },
    activateModal(id) {
      this.isModalVisible = true;
      this.modalId = id;
    },
    deactivateModal() {
      this.isModalVisible = false;
    },
  },
  computed: {
    filterByID() {
      return this.images.filter(image => image.id === this.modalId);
    },
  },
};
</script>

<style>
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
}
.deactivate {
  display: none;
}
html {
  height: 100%;
}
.single__image {
  cursor: pointer;
}
.exit__Btn {
  position: absolute;
  background-image: url('./assets/Xcircle.svg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  padding: 2rem;
  cursor: pointer;
  right: 1rem;
  top: 1rem;
  border-radius: 20px;
  background-color: white;
}
.modal__deactivated {
  display: none;
}
.modal__deactivated img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.modal__wrap {
  position: fixed;
  display: relative;
  width: 60%;
  height: 60%;
}
.modal__wrap img {
  border: 2px solid black;
}
.modal__description {
  border: 2px solid black;
  background-color: white;
  padding: 2rem;
}
.modal {
  position: absolute;
  display: block;
  margin: 20% 10%;
  width: 60%;
  height: 60%;
}
body {
  width: 80%;
  height: 100%;
  margin: auto;
}
#app {
  display: flex;
  flex-direction: column;
}
#searchTerm {
  width: 100%;
}
.images {
  column-count: 3;
}
.images img {
  width: 100%;
}
form {
  width: 100%;
}
.search__block {
  width: 100%;
  justify-content: flex-start;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
