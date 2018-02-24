<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['tooltips']),
    },
    name: 'MeText',
    props: ['text'],
    render(createElement) {
      const renderArray = this.text.split(/(?={)(.*?})/g).map(text => {
        if (text.charAt(0) === '{' && text.substring(text.length - 1) === '}') {
          const id = text.replace(/[{|}]/g,'');
          const tooltip = this.tooltips.find((tt) => {
            return tt.id === id;
          });
          return createElement(
            'v-tooltip',
            {
              props: {
                bottom: true,
              },
            },
            [
              createElement('span', {slot: 'activator', attrs: {class: 'primary--text'}}, id),
              createElement('span', tooltip.mechanic)
            ]
          );
        } else {
          return text;
        }
      });
      return createElement('span', renderArray);
    },
  };
</script>

