//công việc cần làm
//1) Render Song
//2) Scroll Top
//3) Play / Pause
//4) CD rotate
//5) Next / Prev Song 
//6) Random Song
//7) Next/ Repaet song when ended
//8) Active Song
//9)
//10) Play song when on click 
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading   = $('header h2')
const heading1   = $('header h1')
const cdThumb   = $('.cd-thumb')
const audio     = $('#audio')
const progress  = $('#progress')
const btnPrev   = $('.btn-prev')
const btnNext   = $('.btn-next')
const playBtn   = $('.btn-toggle-play')
const playerBtn = $('.player')
const randomBtn = $('.btn-random') 
const btnRepeat = $('.btn-repeat')
const playList  = $('.playlist')
const iconMenu  = $('.icon-menu')
const singerName= $('.name-sigle')
const menuPlaylist = $('.menu-playlist')
const closePlaylist= $('.icon-menu-list')
const iconMusic    =$('span i')

const app = {
    currentIndex: 0,
    isPlaying : false,
    isRandom : false,
    isRepeat: false,
    songs:[
        {
            name  :'Đặng Lòng Thương Em',
            singer:'Huy Vạc',
            path  :'./music/music7.mp3',
            image   :'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/275251040_3255888944695639_8801695700678603572_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=ufEWlTZJP1AAX8gCKLo&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT-cp1Dfgy8VGUs_kv_MfxYCfYXO9E4_D-0fs59Ah25vhA&oe=62435210'
        },
        {
            name  :'Anh Đâu Ngờ',
            singer:'Huy Vạc',
            path  :'./music/music8.mp3',
            image   :'./img/img7.jpg'
        },
        {
            name  :'Vui Lắm Nha',
            singer:'Hương Ly X Jombies',
            path  :'./music/music9.mp3',
            image   :'./img/img13.jpg'
        }
        ,
        {
            name  :'Không Bằng',
            singer:'Na',
            path  :'./music/music10.mp3',
            image   :'./img/img9.jpg'
        }
        ,
        {
            name  :'Là Ai Từ Bỏ Là Ai Vô Tình',
            singer:'Hương Ly X Jombies',
            path  :'./music/music11.mp3',
            image   :'./img/mig14.jpg'
        }
        ,
        {
            name  :'Ái Nộ',
            singer:'Maxsew - Khái vũ',
            path  :'./music/music2.mp3',
            image   :'./img/img5.jpg'
        },
        {
            name  :'Đế Vương',
            singer:'Hoàng Dũng',
            path  :'./music/music1.mp3',
            image   :'./img/img15.jpg'      
        },
        {
            name  :'Muộn rồi mà sao còn',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music13.mp3',
            image   :'./img/img14.jpg'
        },
        {
            name  :'Không phải dạng vừa đâu',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music4.mp3',
            image   :'./img/img4.jpg'
        },
        {
            name  :'Hãy trao cho anh',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music5.mp3',
            image   :'./img/img5.jpg'
        },
        {
            name  :'Cơn mưa ngang qua',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music5.mp3',
            image   :'./img/img6.jpg'
        },
        {
            name  :'Hoa Tàn Tình Tan',
            singer:'Hương Jolly',
            path  :'./music/music12.mp3',
            image   :'./img/img12.jpg'
        }
        
        
    ],
    render:function() {
        var html = '';
        html = this.songs.map((song, index) => {
            return `
                    <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = ${index}>
                        <div class="thumb" 
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>

                        
                    </div>
                   `
       })   
       var htmls = html.join('')
       playList.innerHTML = htmls
       
    },
    //Syntax : Object.defineProperty(obj, prop, descriptor)
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },


    //Xử lý sự kiện
    handelEvents: function(){
        const _this = this // _this == app
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth  

        //xử lý cd quay
        const cdThumbAnimation =  cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],
        {
            duration: 10000, //time animate
            iterations: Infinity 
        }
        )
        cdThumbAnimation.pause()// dừng xoay

        //xử lý nốt nhạc chuyển động
        const iconMusicAnimate = iconMusic.animate([
                { transform: 'translateX(0px)',  color: '#fff'},
                { transform: 'translateX(150px)' , color: 'blue'},
                { transform: 'translateX(0px)' , color: 'yellow'},
                { transform: 'translateX(-150px)' , color: 'green'},
                { transform: 'translateX(0px)' , color: 'red'},
              ], {
                duration: 3000,
                iterations: Infinity
              })     
            iconMusicAnimate.pause();

        // document.onscroll = function(){
        //     const scrollTop = window.scrollY
        //         // console.log(document.documentElement.scrollTop)
        //     const newWidth   = cdWidth - scrollTop
        //     cd.style.width   = newWidth < 20 ? 0 : newWidth + 'px' 
        //     cd.style.opacity = newWidth / cdWidth
        // }
        
        //xử lý play pause  
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause() //dừng phát nhạc
            }else{
                audio.play();// phát nhạc
            }
        }

        //khi playing
        audio.onplay = function(){
            _this.isPlaying = true
            playerBtn.classList.add('playing')
            cdThumbAnimation.play()
            iconMusicAnimate.play();
        }

        //khi pause
        audio.onpause = function(){
            _this.isPlaying = false
            playerBtn.classList.remove('playing')
            cdThumbAnimation.pause()
            iconMusicAnimate.pause();
        }

        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                 const progressPercent =Math.floor((audio.currentTime / audio.duration *100))   // phần trăm bài hát nghe được
                 progress.value = progressPercent
            }   
            //duration: khoảng thời gian
            //tính ra số giây của bài hát đang phát

        }
        


        //xử lý khi tua bài hát
        progress.onchange = function (e){
            const seekTime = audio.duration / 100 * e.target.value // tính thời gian khi click vào input change
            audio.currentTime = seekTime
        }

    
        //xử lý next bài
        btnNext.onclick = function() {
            if(_this.isRandom){
                _this.randomSong()
                audio.play()
            }else{
                _this.nextSong()
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }  
        }

        //xử lý prev bài
        btnPrev.onclick = function() {
            if(_this.isRandom){
                _this.randomSong()
                audio.play()
            }else{
                _this.prevSong()
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }  
        }

        //xử lý lay random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //xử lý lặp lại 1 bài hát
        btnRepeat.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            btnRepeat.classList.toggle('active', _this.isRepeat)
        }

        // xử lý Next bài khi ended
        audio.onended = function() {
            // _this.currentIndex++
            // _this.loadCurrentSong()
            // audio.play()
            if(_this.isRepeat){
                audio.play()
            }else{
                btnNext.onclick()
            }
        }

        // Phát bài hát khi onclick vào bài
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                   _this.loadCurrentSong()
                   _this.render()
                   audio.play()
                    //or songNode.getAttribute('data-index')
                }
            }
        }

        //Xử lý mở menu bài hát
        iconMenu.onclick = function() {
            menuPlaylist.classList.add('show')
        }


        closePlaylist.onclick = function() {
            menuPlaylist.classList.remove('show')
        }

        
    },

    scrollToActiveSong: function() {
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                //scroll màn hình khi bị mất tầm nhìn
                behavior : 'smooth',
                block    : 'nearest'
            })
        },300)
    },

    loadCurrentSong: function(){
        heading.textContent            = this.currentSong.name
        cdThumb.style.backgroundImage  = `url('${this.currentSong.image}')`
        audio.src                      = this.currentSong.path
        singerName.textContent         = this.currentSong.singer
    },

    nextSong: function(){
       this.currentIndex++  
       if(this.cucurrentIndex == this.songs.length){
          this.currentIndex = 0
       }
       this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    randomSong: function() {
        let newIndex
        do  {
            newIndex= Math.floor(Math.random() * this.songs.length);
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex  
        this.loadCurrentSong()
    },


    start: function() {
        this.defineProperties()//định nghĩa các thuộc tính

        this.handelEvents() //xử lý sự kiện DOM

        this.loadCurrentSong() // Thong tin bai hat dau tien
        
        this.render() // render HTML
    }
}

app.start();

