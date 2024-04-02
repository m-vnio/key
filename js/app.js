export default ()=>{

    document.getElementById('meta-theme-color').setAttribute('content', '#1c1c1e')
    const root = document.getElementById('root')
    
    const $elements = (()=> {

        return Array.from( root.querySelectorAll('[id]') ).reduce( (prev, curr )=> {
            
            prev[ curr.getAttribute('id') ] = curr
            return prev

        }, {})

    })()

    const $elementsInputText = (()=> {

        return Array.from( root.querySelectorAll('[data-name]') ).reduce( (prev, curr )=> {
            
            prev[ curr.getAttribute('data-name') ] = curr
            return prev

        }, {})

    })()

    const $elementsInputCheckbox = (()=> {

        return Array.from( root.querySelectorAll('[data-name-active]') ).reduce( (prev, curr )=> {
            
            prev[ curr.getAttribute('data-name-active') ] = curr
            return prev

        }, {})

    })()

    $elements.renderPassword.addEventListener('click', ()=> {
        $elements.renderPassword.classList.add('active')
        renderPassword()
    })

    $elements.renderPassword.addEventListener('transitionend', (e) => {
        if( $elements.renderPassword.classList.contains('active') ) {
            $elements.renderPassword.classList.remove('active')
        }
    });

    $elements.copyCode.addEventListener('click', ()=> {
        $elements.copyCode.classList.add('active')
        copyToClipboard( $elements.textPassword.value )
    })

    $elements.copyCode.addEventListener('transitionend', (e) => {
        if( $elements.copyCode.classList.contains('active') ) {
            $elements.copyCode.classList.remove('active')
        }
    });

    $elements.range.addEventListener('input', ()=> {
        renderPassword()
    })

    Object.values( $elementsInputCheckbox ).forEach(element => {
        element.addEventListener('change', ()=> {
            renderPassword()
        })
    });

    function rand( ...params ){
        const [ max, min = 0] = params.reverse()
        return Math.floor(Math.random() * ((max + 1) - min) + min)
    }

    function copyToClipboard(text = '') {

        if( navigator.clipboard ) {
            navigator.clipboard.writeText(text)
        } else {
            
            const textarea = document.createElement('textarea')
            textarea.setAttribute('style', 'position: fixed; top: 0; transform: translateY(-100%);')
            
            textarea.value = text;
        
            document.body.append(textarea);
        
            textarea.select();
            textarea.setSelectionRange(0, text.length);
        
            document.execCommand('copy');
        
            textarea.remove()
        } 
    
    }

    const renderPassword =()=>{

        const suffle = Object.values( $elementsInputCheckbox ).map(element => {

            if( !element.checked ) return ''
            return $elementsInputText[ element.dataset.nameActive ].value

        }).join('');

        const output = Array( parseInt( $elements.range.value ) ).fill('').map(()=> {

            return suffle[ rand( suffle.length ) ]

        }).join('')

        $elements.textPassword.value = output || Date.now() 
        $elements.rangeProgress.setAttribute('style', `width:${ ((parseInt($elements.range.value) / parseInt($elements.range.max)) * 100).toFixed(2) }%`)
        rangeText.textContent = $elements.range.value
    }

    renderPassword()

}