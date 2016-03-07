<?php
namespace App\Model\Table;

use App\Model\Entity\Book;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Books Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Publishers
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsToMany $Tags
 */
class BooksTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('books');
        $this->displayField('title');
        $this->primaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Publishers', [
            'foreignKey' => 'publisher_id'
        ]);
        $this->belongsTo('Users', [
            'foreignKey' => 'user_id'
        ]);
        $this->belongsToMany('Tags', [
            'foreignKey' => 'book_id',
            'targetForeignKey' => 'tag_id',
            'joinTable' => 'books_tags'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->requirePresence('isbn', 'create')
            ->notEmpty('isbn')
            ->add('isbn', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

        $validator
            ->allowEmpty('title');

        $validator
            ->allowEmpty('subtitle');

        $validator
            ->allowEmpty('abstract');

        $validator
            ->integer('num_pages')
            ->allowEmpty('num_pages');

        $validator
            ->allowEmpty('author');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->isUnique(['isbn']));
        $rules->add($rules->existsIn(['publisher_id'], 'Publishers'));
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        return $rules;
    }
}
