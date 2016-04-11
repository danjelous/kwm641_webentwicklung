<?php

namespace App\Controller;

class LoginController extends AppController {

	public function initialize(){
		$this->loadModel("Users");

		parent::initialize();
	}

	public function beforeFilter(Event $event) {
		parent::beforeFilter($event);

		$this->allow(["index", "logout"]);
	}

	public function index() {
		try {

			if(!isset($this->request->data('username'))) {
				throw new UnauthorizedException("Please enter username!");
			}

			if(!isset($this->request->data('password'))) {
				throw new UnauthorizedException("Please enter password!");
			}

			$username = $this->request->data('username');
			$password = $this->request->data('password');

			// Hash unsecured, plaintext password from http request
			$hashedPW = Security::hash($password);

			// Get User and hashed PW from the database
			$user = $this->Users->find('login', ['username' => $username, 'password' => $hashedPW]);

			// If the login cant be found
			if(!$user) {
				throw new UnauthorizedException("Invalid Login!");
			}

			// Write correct logged in User into Auth-Object
			$this->Auth->setUser($user->toArray());

		} catch (UnauthorizedException $e) {

			// Further declare HTTP-Response-Code
			throw new UnauthorizedException($e->getMessage(), 401);
		}

		// Give it back to the requester :)
		$this->set("user", $this->Auth->user());
		$this->("_serialize", ["user"]);

	}

}
