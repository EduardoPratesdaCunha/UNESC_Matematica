<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
  use Queueable, SerializesModels;

  public $token;
  public $email;

  /**
   * Create a new message instance.
   *
   * @param string $token
   * @param string $email
   */
  public function __construct($token, $email)
  {
    $this->token = $token;
    $this->email = $email;
  }


  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Recuperar Senha',
    );
  }

  public function content(): Content
  {
    return new Content(
      view: 'mails.password',
      with: ['token' => $this->token, 'email' => $this->email],
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
