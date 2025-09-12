export interface Email {
    id: number;
    sender: string;
    senderDisplay: string;
    subject: string;
    body: string;
    isPhish: boolean;
    clues: string[];
  }
  