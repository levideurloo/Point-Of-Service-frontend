import Vue from 'vue';
import User, { UserInterface } from 'src/app/models/User';
import CredentialsInterface from 'src/app/models/CredentialsInterface';
import { tokenName } from 'src/boot/axios';
import Cookie from 'src/app/helpers/cookie';
import { AppleCredentialsInterface } from 'src/app/models/AppleCredentialsInterface';
import Store from 'src/store';
import { GoogleCredentialsInterface } from 'src/app/models/GoogleCredentialsInterface';
import { AuthResponseInterface } from 'src/app/models/AuthResponseInterface';
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';

export const Application:Vue = Vue.prototype;

// @ts-ignore
@Module({
  name: 'AuthenticationModule',
  dynamic: true,
  store: Store,
})
class AuthenticationModule extends VuexModule {
  public authenticated: boolean = false;
  public user: User | null = null;

  @Mutation
  private SET_USER(value: UserInterface | undefined | null) {
    this.authenticated = value === undefined ? false : !!value;
    if (value === undefined || value === null) return (this.user = null);
    return (this.user = new User(value));
  }

  @Action({ rawError: true })
  public async signin(credentials: CredentialsInterface) {
    await Application.$axios
      .post('login', credentials)
      .then((response) =>
        this.setAuthenticationDetails(response.data as AuthResponseInterface)
      );
  }

  @Action({ rawError: true })
  public async setUser(data: UserInterface) {
    return await Application.$axios
      .put('account', data)
      .then((response) => this.context.commit('SET_USER', response.data))
  }

  @Action({ rawError: true })
  public async check() {
    if (!Cookie.prototype.hasCookieOrStorage(tokenName)) return false;
    Cookie.prototype.checkAndSetAuthorizationHeader(tokenName);

    await Application.$axios
      .get('user')
      .then((response) =>
        this.setAuthenticationDetails(response.data as AuthResponseInterface)
      )
      .catch(() => this.resetAuthState());
  }

  @Action({ rawError: true })
  public async signinWithApple(credentials: AppleCredentialsInterface) {
    await Application.$axios
      .post('login/apple', credentials)
      .then((response) =>
        this.setAuthenticationDetails(response.data as AuthResponseInterface)
      );
  }

  @Action({ rawError: true })
  public async signinWithGoogle(credentials: GoogleCredentialsInterface) {
    await Application.$axios
      .post('login/google', credentials)
      .then((response) => {
        console.log(response);
        this.setAuthenticationDetails(response.data as AuthResponseInterface);
      });
  }

  @Action({ rawError: true })
  public async signinWithSocial(access_token: string) {
    await Application.$axios
      .post(`auth/facebook/callback`, {
        access_token: access_token,
      })
      .then((response) =>
        this.setAuthenticationDetails(response.data as AuthResponseInterface)
      );
  }

  @Action({ rawError: true })
  public async signOut() {
    await Application.$axios.post('logout').then(() => this.resetAuthState());
  }

  @Action({ rawError: true })
  public async signUp(credentials: CredentialsInterface) {
    await Application.$axios
      .post('register', credentials)
      .then((response) =>
        this.setAuthenticationDetails(response.data as AuthResponseInterface)
      );
  }

  @Action({ rawError: true })
  protected setAuthenticationDetails(response: AuthResponseInterface): User | null {
    Cookie.prototype.setCookieAndStorage(tokenName, response.access_token);
    this.context.commit('SET_USER', response.user);

    return this.user;
  }

  @Action({ rawError: true })
  protected resetAuthState(): void {
    Application.$axios.defaults.headers.Authorization = '';
    Cookie.prototype.removeCookieAndStorage(tokenName);

    this.context.commit('SET_USER', null);
    this.context.commit('SET_MESSAGES', false);
  }
}

export default getModule(AuthenticationModule);
