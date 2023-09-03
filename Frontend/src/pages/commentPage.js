import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import CommentClient from "../api/commentClient";

class CommentPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGet', 'onCreate', 'renderComments'], this);
        this.dataStore = new DataStore();
    }

    /**
     * Once the page has loaded, set up the event handlers
     */
    async mount() {

        document.getElementById('create-comment-form').addEventListener('submit', this.onCreate);
        this.client = new CommentClient();
        this.dataStore.addChangeListener(this.renderComments);
        this.onGetComments();
    }

    /** Render Methods -----------------------------------------------------------------------------------------------*/

    async renderComments() {
        const comments = this.dataStore.get("comments");
        const resultArea = document.getElementById("resultArea");
        let myHtml = "<ul>";
          if (comments.length === 0) {
              resultArea.innerHTML = "No Comments";
              return;
            }

        for(let comment of comments){
        myHtml +=`
        <li>
            <h3>${comment.title}</h3>
            <h4>${comment.owner}</h4>
            <p>${comment.content}</p>
         </li>
            `
        }
        myHtml +="</ul>";
        resultArea.innerHTML = myHtml;
    }

    /** Event Handlers -----------------------------------------------------------------------------------------------*/

    async onGetComments() {
        // Prevent the page from refreshing on form submit
        event.preventDefault();

       let result = await this.client.getAllComments(this.errorHandler);
       this.dataStore.set("comments", result);
    }

    async onCreate(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();
        this.dataStore.set("example", null);

        let owner = document.getElementById("create-comment-owner").value;
        let title = document.getElementById("create-comment-title").value;
        let content = document.getElementById("create-comment-content").value;

        const createdComment = await this.client.createComment(owner, title, content, this.errorHandler);


        if (createdComment) {
            this.showMessage("Posted a comment!")
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
        this.onGetComments();
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const commentPage = new CommentPage();
    commentPage.mount();
};

window.addEventListener('DOMContentLoaded', main);