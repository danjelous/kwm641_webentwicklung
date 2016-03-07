<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Publishers Controller
 *
 * @property \App\Model\Table\PublishersTable $Publishers
 */
class PublishersController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Network\Response|null
     */
    public function index()
    {
        $publishers = $this->paginate($this->Publishers);

        $this->set(compact('publishers'));
        $this->set('_serialize', ['publishers']);
    }

    /**
     * View method
     *
     * @param string|null $id Publisher id.
     * @return \Cake\Network\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $publisher = $this->Publishers->get($id, [
            'contain' => ['Books']
        ]);

        $this->set('publisher', $publisher);
        $this->set('_serialize', ['publisher']);
    }

    /**
     * Add method
     *
     * @return \Cake\Network\Response|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $publisher = $this->Publishers->newEntity();
        if ($this->request->is('post')) {
            $publisher = $this->Publishers->patchEntity($publisher, $this->request->data);
            if ($this->Publishers->save($publisher)) {
                $this->Flash->success(__('The publisher has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The publisher could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('publisher'));
        $this->set('_serialize', ['publisher']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Publisher id.
     * @return \Cake\Network\Response|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $publisher = $this->Publishers->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $publisher = $this->Publishers->patchEntity($publisher, $this->request->data);
            if ($this->Publishers->save($publisher)) {
                $this->Flash->success(__('The publisher has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The publisher could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('publisher'));
        $this->set('_serialize', ['publisher']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Publisher id.
     * @return \Cake\Network\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $publisher = $this->Publishers->get($id);
        if ($this->Publishers->delete($publisher)) {
            $this->Flash->success(__('The publisher has been deleted.'));
        } else {
            $this->Flash->error(__('The publisher could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
