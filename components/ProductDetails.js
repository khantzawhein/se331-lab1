const productDetails = {
    template: `
     <ul>
          <li v-for="detail in details">
            {{ detail }}
          </li>
        </ul>
    `,
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const details = computed(() => props.details)
        return {
            details
        }
    }
}