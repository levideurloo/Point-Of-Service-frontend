import { axios } from 'src/boot/axios';

export default class Cookie {
  public getCookie(cname: string): string {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }

    return '';
  }

  public setCookie(cname: string, value: string): string {
    const nameAndVal = `${cname}=${value};`;
    const cookieInfo = `expires=18000000;SameSite=lax;Secure=true;path=/;priority=high;`;

    return (document.cookie = `${nameAndVal}${cookieInfo}`);
  }

  public setCookieAndStorage(name: string, value: string): string {
    localStorage.setItem(name, value);
    this.setCookie(name, value);
    return this.checkAndSetAuthorizationHeader(name);
  }

  public removeCookieAndStorage(name: string) {
    localStorage.clear();
    document.cookie = name + '=; Max-Age=-18000000;';
    axios.defaults.headers['Authorization'] = '';
  }

  public hasCookieOrStorage(name: string): boolean {
    const storage = localStorage.getItem(name);
    const cookie = this.getCookie(name);

    return !!storage || !!cookie;
  }

  public checkAndSetAuthorizationHeader(name: string): string {
    const storage = localStorage.getItem(name);
    const cookie = this.getCookie(name);
    let header;

    if (!!storage) header = `Bearer ${storage}`;
    else if (!!cookie) header = `Bearer ${cookie}`;

    if (!!header) {
      return (axios.defaults.headers['Authorization'] = header);
    } else return (axios.defaults.headers['Authorization'] = '');
  }
}
