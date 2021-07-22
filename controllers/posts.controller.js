const { response } = require('express');
const {pool} = require('../database');
const postController = {};
const fetch = require("node-fetch");

arr_images = []

// Get all posts with method get
postController.getPosts = async(req,res)=>{
    const post = await pool.query('SELECT * FROM posts');
    if (post.rows.length>0){
        activepost = [];
        post.rows.forEach((value) => {
            if (value.status == true){
                activepost.push(value);
            }
        });
        res.json(activepost)
      }else{
        res.json({Message: 'No posts found'})
      }

}


// Get one post with method get
postController.getPost = async(req,res)=>{
    const id = req.params.id;
    await pool.query('SELECT * FROM posts WHERE post_id = $1',[id], (err, pst) =>{
        console.log(pst);
        if (pst.rows.length == 0 || pst.rows[0].status == false){
            res.json({
                code : 404,
                Message: "Post not found"
            });
        }else{
            var viewsnumber = pst.rows[0].views
            var newviewsnumber = runDecorator(viewsnumber)
            
            console.log(newviewsnumber);

            const response = pool.query('UPDATE posts SET views = $1 WHERE post_id = $2', [newviewsnumber,id]);
            console.log(response);

            pst.rows[0].views = pst.rows[0].views + 1
            res.json({
                    Message: 'Post viewed successfully ',
                    code: 200,
                    data : pst.rows[0]
                })

        }
    });

 

}

// Get imagesPost with method get
postController.getImagesPost = async(req,res)=>{
    const word = req.params.word;
    arr_images = []
    const base_url = 'https://pixabay.com/api/'
    const api_key = '22598012-ffd573dbbd295bea2b3baef64'
    await fetch(base_url + "?key=" + api_key + "&q=" + word)
    .then(function(response) {
        console.log('response.body =', response.body);
        console.log('response.bodyUsed =', response.bodyUsed);
        console.log('response.headers =', response.headers);
        console.log('response.ok =', response.ok);
        console.log('response.status =', response.status);
        console.log('response.statusText =', response.statusText);
        console.log('response.type =', response.type);
        console.log('response.url =', response.url);
        return response.json();
     
    })
    .then(function(data) {
        console.log('data = ', data);
        arr = []
        arr = data.hits
        arr.forEach(logArrayElements);
        return this.arr_images

    })
    .catch(function(err) {
        console.error(err);
    });


res.json({images:arr_images})

}


// Create one post with method post
postController.postPost = async(req,res)=>{
    const newPost = {channel_id,title,content} = req.body;
    
    const addPost = await pool.query('INSERT INTO posts (channel_id,title,content,views,likes,status) VALUES ($1,$2,$3,$4,$5,$6)',[newPost.channel_id,newPost.title,newPost.content,0,0,true]);
    res.json({
        Message: 'Post add successfully ',
        code: 200,
        data: newPost
    })

}


// Update one post with method put
postController.putPost = async (req, res) =>{
    const id = req.params.id;
    const  {title,content} = req.body;
    const response = await pool.query('UPDATE posts SET title = $1, content = $2 WHERE post_id = $3', [title,content,id]);
    console.log(response);
    res.json({
        Message: 'Post updated successfully ',
        code: 200,
        PostUpdated : {
            title: title,
            content: content
        }
    })

}

// use decorator pattern
let Like = function (number) {
    this.number = number;
    this.num = function () {
        return this.number;
    };
}

let DecoratedLike = function (number) {
   this.number = number + 1;
    this.numdecorator = function () {
        return this.number;
    };

}


function runDecorator(number) {
    let like = new Like(number);
    var valor = like.num();

    let decorated = new DecoratedLike(valor);
    return decorated.numdecorator();
}


// Update one post with like by method put
postController.putPostLike = async (req, res) =>{
    const id = req.params.id;
    await pool.query('SELECT likes FROM posts WHERE post_id = $1', [id], (err, like)=>{
        if (like.rows.length > 0){
            var likesnumber = like.rows[0].likes
            var newlikesnumber = runDecorator(likesnumber)
            console.log('***********************');
            console.log(newlikesnumber);

            const response = pool.query('UPDATE posts SET likes = $1 WHERE post_id = $2', [newlikesnumber,id]);
            console.log(response);
            res.json({
                    Message: 'Post liked successfully ',
                    code: 200,
                    PostUpdated : {
                        post_id: id,
                        likes: newlikesnumber
                    }
                })
        }else{
            res.json({Message: "Post not found", code:404})
        }
       


    });

}

// Delete one channel with method put
postController.deletePost = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('UPDATE posts SET status = $1 WHERE post_id = $2', [false, id ]);
    console.log(response);
    res.json({
          Message: 'Post deleted successfully ',
        code: 200,
        PostId : id
    })

}

function logArrayElements(element, index) {
    if(index <5){
      arr_images.push(element.largeImageURL)
    }


}

function api_images_pixabay(image_search) {

}

module.exports = postController;