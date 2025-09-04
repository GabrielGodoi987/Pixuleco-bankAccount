'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bank-account-racing-condition documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' : 'data-bs-target="#xs-controllers-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' :
                                            'id="xs-controllers-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' : 'data-bs-target="#xs-injectables-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' :
                                        'id="xs-injectables-links-module-AccountModule-d39d48450b751d3ac7cfff0776d75ab0061f582e3d3d05934edb8021a02a9161a2a40902c9f51f3cdf3cecf375460f3927ba81a192c98c2f0979c8184c7d3b5c"' }>
                                        <li class="link">
                                            <a href="injectables/AccountRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransactionsRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' :
                                            'id="xs-controllers-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' :
                                        'id="xs-injectables-links-module-AppModule-6a4f3ab71f69fab6efe72798e7f6047f7b292cf97e9c5bfd0d420b24a444119ad512c571811bf83a123ede8d62ed3568aa42790361d27cc405b877caf0f836e4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' :
                                            'id="xs-controllers-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' :
                                        'id="xs-injectables-links-module-AuthModule-93d6d769352b9bdaf1f9cd72b2f401ea3c00438fcf4127e9beca39899804a01aff8caa55c9be7b567a300e5b6abe52f36ba17d03891310a76cbeb6add693606f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' : 'data-bs-target="#xs-controllers-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' :
                                            'id="xs-controllers-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' : 'data-bs-target="#xs-injectables-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' :
                                        'id="xs-injectables-links-module-UserModule-055865d0c1213c0a4dada027ce6f11de912bb361e98b45207616e8ad23fad75d0ea8b9fe6e713a72d40d8cf7b821db8e6f664745781203accdc1105ae1302f8a"' }>
                                        <li class="link">
                                            <a href="injectables/AccountRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AccountEntity.html" data-type="entity-link" >AccountEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TransactionEntity.html" data-type="entity-link" >TransactionEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccountDto.html" data-type="entity-link" >CreateAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTableAccounts1752935606883.html" data-type="entity-link" >CreateTableAccounts1752935606883</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTableTransaction1752935614586.html" data-type="entity-link" >CreateTableTransaction1752935614586</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTableUsers1752935590369.html" data-type="entity-link" >CreateTableUsers1752935590369</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepositDto.html" data-type="entity-link" >DepositDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepositProcessor.html" data-type="entity-link" >DepositProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvestimentProcessor.html" data-type="entity-link" >InvestimentProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseUserDto.html" data-type="entity-link" >ResponseUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransactionDto.html" data-type="entity-link" >TransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransactionProcessor.html" data-type="entity-link" >TransactionProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedExceptionError.html" data-type="entity-link" >UnauthorizedExceptionError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedExceptionFilter.html" data-type="entity-link" >UnauthorizedExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UtilsService.html" data-type="entity-link" >UtilsService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthApiKeyMiddleware.html" data-type="entity-link" >AuthApiKeyMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformDatePipe.html" data-type="entity-link" >TransformDatePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/PaginatedResponse.html" data-type="entity-link" >PaginatedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignedUser.html" data-type="entity-link" >SignedUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});