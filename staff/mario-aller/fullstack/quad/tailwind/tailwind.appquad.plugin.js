const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme }) => {
    addBase({
        h1: {
            fontSize: theme('fontSize.4xl'),
            'color': 'red'
        },

        html: {
            'box-sizing': 'border-box',
            'height': '100vh',
            'background-color': 'beige',
            'font-family': 'sans-serif',
        },
        body: {
            'box-sizing': 'border-box',
            'height': '100vh',
            'background-color': 'beige',
            'font-family': 'sans-serif',
        }

    })

    addComponents({
        '.basic-form': {
          'margin': '0.5rem',
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          'background-color': 'lightgray',
          'border-radius': '2rem',
          'box-shadow': '0.5rem 0.5rem 0.5rem darkgray',
          'padding': '1rem',
        },
      
        '.basic-view': {
          'margin': '0.5rem',
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          'background-color': 'lightgray',
          'border-radius': '2rem',
          'box-shadow': '0.5rem 0.5rem 0.5rem darkgray',
          'padding': '1rem',
        },
      
        '.basic-container': {
          'margin': '1rem',
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          'background-color': 'rgb(161, 195, 161)',
          'border-radius': '2rem',
          'box-shadow': '0.5rem 0.5rem 0.5rem rgb(66, 98, 86)',
          'padding': '1rem',
        },
      
        '.basic-button': {
          'margin': '1rem',
          'padding': '0.1rem 0.8rem',
          'border-radius': '0.5rem',
          'background-color': 'lightgray',
          'box-shadow': '0.3rem 0.3rem 0.4rem gray',
        },
      
        '.basic-label': {
          'font-size': '0.8rem',
        },
      
        '.basic-modal': {
          'position': 'fixed',
          'top': '0',
          'width': '100%',
          'height': '100%',
          'background-color': 'rgb(0, 0, 0, 0.5)',
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        // basic sets
      
        '.logo': {
          '  width': '10%',
          'border-radius': '1rem',
          'margin-right': '1rem',
        },
      
        '.basic-head': {
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
          'background-color': 'lightgray',
          'border-radius': '2rem',
          'box-shadow': '0.5rem 0.5rem 0.5rem darkgray',
          'padding': '1rem 1rem 1rem 1rem',
          '  width': '70%',
        },
      
        '.basic-nav': {
          'margin': '1rem',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
          'background-color': 'lightgray',
          'border-radius': '2rem',
          'position': 'fixed',
          'bottom': '1rem',
          'box-shadow': '0.5rem 0.5rem 0.5rem darkgray',
        },
      
        // Login
      
        '.login': {
          '  width': '100%',
          'height': '100%',
          'display': 'grid',
          'grid-template-columns': '1fr',
          'grid-template-rows': '1f 5fr 1fr',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.log-header': {
          'grid-column': '1/2',
          'grid-row': '1/2',
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.log-view': {
          'grid-column': '1/2',
          'grid-row': '2/3',
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.log-nav': {
          'grid-column': '1/2',
          'grid-row': '3/4',
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        // Register
      
        '.register': {
          '  width': '100%',
          'height': '100%',
          'display': 'grid',
          'grid-template-columns': '1fr',
          'grid-template-rows': '1fr 5fr 1fr',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.reg-header': {
          'grid-column': '1/2',
          'grid-row': '1/2',
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.reg-view': {
          'grid-column': '1/2',
          'grid-row': '2/3',
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.reg-nav': {
          'grid-column': '1/2',
          'grid-row': '3/4',
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'background-color': 'aliceblue',
        },
      
        /* Home */
      
        '.home': {
          '  width': '100%',
          'height': '100%',
          'display': 'grid',
          'grid-template-columns': '1fr',
          'grid-template-rows': '1fr 10fr 1fr',
        },
      
        '.home-header': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'position': 'fixed',
          'padding': '2rem 0 2rem 0',
          '  width': '100%',
        },
      
        '.home-view': {
          'margin-top': '8rem',
          'padding-bottom': '5rem',
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.home-nav': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          '/* display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center'
        },
      
        // Panels
      
        '.panel': {
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          'margin': '0.5rem',
          'border-radius': '1rem',
          'background-color': 'antiquewhite',
        },
      
        '.panel-list': {
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.panel-text': {
          'padding': '0.5rem',
          'font-size': '1.1rem',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.panel-button': {
          'font-size': '2.5rem',
          'margin-right': '0.3rem',
          'border': 'none',
          'justify-content': 'center',
          'align-items': 'center',
          'background-color': 'antiquewhite',
          'margin': '0.2rem',
        },
      
        '.panel-button-cancel': {
          'font-size': '1.1rem',
          'margin-left': '1rem',
          'justify-content': 'center',
          'align-items': 'center',
          'border': 'none',
          'background-color': 'antiquewhite',
        },
      
        '.panel-block-button': {
          'font-size': '1.7rem',
          'margin-left': '1rem',
          'justify-content': 'center',
          'align-items': 'center',
          'border': 'none',
          'background-color': 'antiquewhite',
        },
      
        '.panel-block': {
          'font-size': '0.9rem',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        // Layers and commands
      
        '.flex-center': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      
        '.root-react': {
          'height': '100%',
        },
      })

    addUtilities({
        '.content-hidden': {
            contentVisibility: 'hidden'
        }
    })
})