//CÔNG VIỆC CẦN LÀM
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

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player  = $('.player')
const playBtn = $('.btn-toggle-play')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio   = $('#audio')

const app = {
    curentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name  :'Chúng ta không thuộc về nhau',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music2.mp3',
            image   :'./img/img2.jpg'
        },
        {
            name  :'Nơi này có anh',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music1.mp3',
            image   :'./img/img1.jpg'
        },
        {
            name  :'Muộn rồi mà sao còn',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music3.mp3',
            image   :'/img/img3.jpg'
        },
        {
            name  :'Không phải dạng vừa đâu',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music4.mp3',
            image   :'/img/img4.jpg'
        },
        {
            name  :'Hãy trao cho anh',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music5.mp3',
            image   :'/img/img5.jpg'
        },
        {
            name  :'Cơn mưa ngang qua',
            singer:'Sơn Tùng Mtp',
            path  :'./music/music5.mp3',
            image   :'/img/img6.jpg'
        }
    ],

    
    //Render giao diện
    render: function() {
        var htmls = this.songs.map(function(song){
            return `<div class="song">
                        <div class="thumb" style="background-image: url('${song.image}')"></div>                 
                        <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                        </div>
                </div>`
        })
        $('.playlist').innerHTML = htmls.join('');
    },

    //Hàm đinh nghĩa phương thức cho Object
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.curentIndex]
            }
        })
    },

    //Xử lý các sự kiện
    handleEvents: function() {
        const _this = this
        var cd = $('.cd')
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop
            console.log(newWidth)
            cd.style.width = newWidth < 20 ? 0 : newWidth + 'px'
            cd.style.opacity = newWidth / cdWidth;
        }

        //Xử lý play nhạc
        playBtn.onclick = function() {
            if(_this.isPlaying){
                _this.isPlaying == false
                audio.pause()
                player.classList.remove('playing')
            }else{
                _this.isPlaying = true
                audio.play()
                player.classList.add('playing')
            }   
        }
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.scr = this.currentSong.path
    },


    //Hàm khỏi chạy 
    start: function() {
        //định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Xủ lý các sự kiện trong DOM
        this.handleEvents()

        //Tải bài hát hiện tại
        this.loadCurrentSong()

        //Render ra giao diện
        this.render()
    }
}

app.start()

