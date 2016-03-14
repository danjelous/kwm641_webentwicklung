<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Books Controller
 *
 * @property \App\Model\Table\BooksTable $Books
 */
class BooksController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Network\Response|null
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Publishers', 'Users', 'Tags']
        ];
        $books = $this->paginate($this->Books);

        $this->set(compact('books'));
        $this->set('_serialize', ['books']);
    }

    /**
     * View method
     *
     * @param string|null $id Book id.
     * @return \Cake\Network\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $book = $this->Books->get($id, [
            'contain' => ['Publishers', 'Users', 'Tags']
        ]);

        $this->set('book', $book);
        $this->set('_serialize', ['book']);
    }

    /**
     * Add method
     *
     * @return \Cake\Network\Response|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $book = $this->Books->newEntity();
        if ($this->request->is('post')) {
            $book = $this->Books->patchEntity($book, $this->request->data);
            if ($this->Books->save($book)) {
                $this->Flash->success(__('The book has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The book could not be saved. Please, try again.'));
            }
        }
        $publishers = $this->Books->Publishers->find('list', ['limit' => 200]);
        $users = $this->Books->Users->find('list', ['limit' => 200]);
        $tags = $this->Books->Tags->find('list', ['limit' => 200]);
        $this->set(compact('book', 'publishers', 'users', 'tags'));
        $this->set('_serialize', ['book']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Book id.
     * @return \Cake\Network\Response|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $book = $this->Books->get($id, [
            'contain' => ['Tags']
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $book = $this->Books->patchEntity($book, $this->request->data);
            if ($this->Books->save($book)) {
                $this->Flash->success(__('The book has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The book could not be saved. Please, try again.'));
            }
        }
        $publishers = $this->Books->Publishers->find('list', ['limit' => 200]);
        $users = $this->Books->Users->find('list', ['limit' => 200]);
        $tags = $this->Books->Tags->find('list', ['limit' => 200]);
        $this->set(compact('book', 'publishers', 'users', 'tags'));
        $this->set('_serialize', ['book']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Book id.
     * @return \Cake\Network\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $book = $this->Books->get($id);
        if ($this->Books->delete($book)) {
            $this->Flash->success(__('The book has been deleted.'));
        } else {
            $this->Flash->error(__('The book could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }

	 public function isbn() {

		 // Get paramter-value from URL, which is stored in global array
		 $isbn = $this->request->params['pass'];

		 // Books --> Zugriff auf Books-Repository (Model)
		 // Alle ISBN-Nummern, di mit Teilstring beginnen
		 $book = $this->Books->find('all')
		 	->where(["isbn LIKE" => $isbn[0] . "%"])
			->contain(["Publishers", "Users", "Tags"]);

		// View-Variable für das serialoze angeben
		 $this->set('book', $book);

		 // Pls show the book as JSON, not a PHP array
		 $this->set("_serialize", ["book"]);
	 }

	 public function removeByISBN() {

		 $isbn = $this->request->params['pass'];

		 // Darf nur mit POST und DELETE aufgerufen werden
		 $this->request->allowMethod(["delete", "post"]);

		 $book = $this->Books->find('all')
			->where(["isbn LIKE" => $isbn[0] . "%"])->first();

		 $this->Books->delete($book);

		 $this->set("book", "Book with ISBN " . $isbn . " has been deleted successfully.");
	 }

	 public function updateByISBN() {
		 $isbn = $this->request->params['pass'];
		 $this->request->allowMethod(["put", "post"]);

		 //$this->set("book", "Book with ISBN " . $isbn . " has been deleted successfully.");
		 $this->set("book", "Bitch u got updated.");
		 $this->set("_serialize", ["book"]);
	 }

	 public function createByISBN() {
		 $isbn = $this->request->params['pass'];
		 $this->request->allowMethod(["put", "post"]);

		 //$this->set("book", "Book with ISBN " . $isbn . " has been deleted successfully.");
		 $this->set("book", "Bitch u got created and posted.");
		 $this->set("_serialize", ["book"]);
	 }
}
