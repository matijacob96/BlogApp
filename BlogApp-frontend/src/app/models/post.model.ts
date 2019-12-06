export class Post {
  
    private id = '';
    private title;
    private text;
    private author_id = '';

    constructor(title, text) {
        this.title = title;
        this.text = text;
    }

    getTitle() {
        return this.title;
    }

    getText() {
        return this.text;
    }

    setTitle(title){
        this.title = title;
    }

    setText(text){
        this.text = text;
    }

    setId(id){
        this.id = id;
    }

    getId() {
        return this.id;
      }
}