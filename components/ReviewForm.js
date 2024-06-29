const reviewForm = {
    template: `
      <form class="review-form">
        <label for="recommend-ques">
          Would you recommend this product?
        </label>
        <div style="display: flex">
          <button class="button" @click.prevent="onRecommend">Yes</button>
          <button class="button" @click.prevent="onRecommend(false)">No</button>
        </div>

        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>

        <input class="button" type="submit" value="Submit" @click.prevent="onSubmit">

      </form>
    `,
    setup(props, {emit}) {
        const form = reactive({
            name: '',
            review: '',
            rating: null,
            recommend: null
        })

        function onSubmit() {
            if (form.name === '' || form.review === '' || form.rating === null) {
                alert('Review is incomplete. Please fill out every field.')
                return
            }
            const productReview = {
                name: form.name,
                review: form.review,
                rating: form.rating,
                recommend: form.recommend
            }
            emit('review-submitted', productReview)
        }


        function onRecommend(recommend = true) {
            form.recommend = recommend
        }

        return {
            ...toRefs(form),
            onSubmit,
            onRecommend
        }
    }
}