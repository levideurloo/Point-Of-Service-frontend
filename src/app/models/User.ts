import { Application } from 'src/store/modules/AuthenticationModule';

export interface UserInterface {
  id: number;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  email: string;
  dark_mode?: boolean;
  created_at: string;
}

export default class User {
  protected id: number;
  protected email: string;
  protected first_name!: string;
  protected last_name!: string;
  protected avatar_url!: string;
  protected dark_mode!: boolean;
  protected created_at: string;

  constructor(data: UserInterface) {
    this.id = data.id;
    this.email = data.email;
    this.first_name = data.first_name ?? ' ';
    this.last_name = data.last_name ?? ' ';
    this.avatar_url = data.avatar_url ?? '/assets/img/placeholder/no-avatar.webp';
    this.dark_mode = data.dark_mode ?? false;
    this.created_at = data.created_at;
  }

  public getId(): number {
    return this.id;
  }

  public getAvatarURL(): string {
    if (this.avatar_url) return this.avatar_url;
    return '/assets/img/placeholder/no-avatar.webp';
  }

  public getDarkModeEnabled(): boolean {
    return this.dark_mode;
  }

  public async toggleDarkMode(): Promise<void> {
    await Application.$axios
      .post('account/dark_mode')
      .then(() => (this.dark_mode = !this.dark_mode));
  }

  public getCreatedAt(): string {
    return this.created_at;
  }
}
