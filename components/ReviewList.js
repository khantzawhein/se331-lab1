const reviewList = {
    template: `
        <div class="review-container">
        <h3>Reviews:</h3>
        <ul>
        <li v-for="(review, index) in reviews" :key="index">
        {{review.name}} gave this {{review.rating}} stars
        <br>
        "{{review.review}}" and {{ review.recommend ? "recommended" : "not recommended" }} this product
        <br>
</li>
</ul>
</div>
    `,
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },

    setup(props) {
        const reviews = computed(() => props.reviews)
        return {
            reviews
        }
    }
}