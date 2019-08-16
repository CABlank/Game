
      
      const verde = document.getElementById('verde')
      const azul = document.getElementById('azul')
      const amarillo = document.getElementById('amarillo')
      const violeta = document.getElementById('violeta')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const ultimoNivel= 10

      class Juego {
        constructor(){
          this.iniciar()
          this.generarSecuencia()
          setTimeout(this.siguienteNivel(),500)
        }

        iniciar(){
          this.escogerColor = this.escogerColor.bind(this)
          this.toggleBtnEmpezar()
          this.nivel=1
          this.colores={
          verde,
          azul,
          amarillo,
          violeta
          }
        }

        toggleBtnEmpezar(){
          if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
          } else {
            btnEmpezar.classList.add('hide')
          }
        }

        generarSecuencia(){
          this.secuencia= new Array(ultimoNivel).fill(0).map( n=> Math.floor(Math.random()*4))
        }

        siguienteNivel(){
          this.subnivel=0
          this.iluminarSecuencia()
          this.agregarEvento()

        }

        transformarNumeroAColor(numero){
          switch(numero){
            case 0:
              return 'verde'
            case 1:
              return 'azul'
            case 2:
              return 'amarillo'
            case 3: 
              return 'violeta'
          }
        }

      transformarColorANumero(color){
          switch(color){
            case 'verde':
              return 0
            case 'azul':
              return 1
            case 'amarillo':
              return 2
            case 'violeta': 
              return 3
          }
        }     

        iluminarSecuencia(){
          for(let i=0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(()=> this.iluminarColor(color),250*i)
          }
        }

        iluminarColor(color){
          this.colores[color].classList.add('light')
          setTimeout(()=>this.apagarColor(color),350)
        }

        apagarColor(color){
          this.colores[color].classList.remove('light')
        }

        agregarEvento(){
          this.colores.verde.addEventListener('click',this.escogerColor)
          this.colores.azul.addEventListener('click',this.escogerColor)
          this.colores.amarillo.addEventListener('click',this.escogerColor)
          this.colores.violeta.addEventListener('click',this.escogerColor)
        }
        
        eliminarEventos(){
          this.colores.verde.removeEventListener('click',this.escogerColor)
          this.colores.azul.removeEventListener('click',this.escogerColor)
          this.colores.amarillo.removeEventListener('click',this.escogerColor)
          this.colores.violeta.removeEventListener('click',this.escogerColor)
        }

        escogerColor(ev){
          const nombreColor= ev.target.dataset.color
          const numeroColor= this.transformarColorANumero(nombreColor)
          this.iluminarColor(nombreColor)

          if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel){
              this.nivel++
              this.eliminarEventos()
            
              if(this.nivel === ultimoNivel + 1){
                this.ganoElJuego()
              } else{
                setTimeout(this.siguienteNivel.bind(this),1500)
              }
            }
          } else{
            this.perdioElJuego()
          }
        }


        ganoElJuego(){
          swal('Ganaste!','Felicidades, Ganaste el Juego','success')
          .then(this.iniciar.bind(this))
        }

        perdioElJuego(){
          swal('Perdiste','Lo siento, Perdiste el Juego :(','error')
          .then(()=>{
              this.eliminarEventos()
              this.iniciar()
          })
        }

      }
    

    function EmpezarJuego(){
        window.juego= new Juego()
    }



































