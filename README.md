billingstack-ui
===============

BillingStack UI (AngularJS 100% Client Side)

The easy way
------------

#### Clone the repository

    git clone http://github.com/billingstack/billingstack-ui
    cd billingstack-ui
    
#### Install deps (nvm, node, npm, bower, grunt)

    ./tools/helper.sh install_deps
    
#### Install JS deps (Angular, etc)

    ./tools/helper.sh install_ui_deps
    
#### Now you can either build it using grunt or via the helper. 
More or the less useless because it's only grunt.

    ./tools/helper.sh build
    
More interesting, build a target.tar.gz for deployment

    ./tools/helper.sh build_dist

The hard way
------------
    # curl https://raw.github.com/creationix/nvm/master/install.sh | sh

    ...

    Cloning into '/root/.nvm'...
    remote: Counting objects: 602, done.
    remote: Compressing objects: 100% (396/396), done.
    remote: Total 602 (delta 296), reused 484 (delta 195)
    Receiving objects: 100% (602/602), 91.40 KiB, done.
    Resolving deltas: 100% (296/296), done.

    => Appending source string to /root/.profile
    => Close and reopen your terminal to start using NVM

    # nvm ls-remote
    v0.1.14 ... ...      ...
    ...
    ...     ... v0.10.10 ...
    ...     ... ...      ...

    # nvm install 0.10.10
    ######################################################################## 100.0%
    Now using node v0.10.10

    # nvm ls
    v0.10.7
    current:   v0.10.10

    # npm install -g grunt-cli
    # npm install -g bower

    # git clone http://github.com/billingstack/billingstack-ui
    # cd billingstack-ui
    # npm install

#### Build BillingStack UI

    # grunt


Starting a webserver using the grunt command
--------------------------------------------
#### Development Environment

    # grunt dev

#### Production Environment

    # grunt prod
