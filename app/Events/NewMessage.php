<?php

namespace App\Events;

use App\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use \Illuminate\Contracts\Event\Dispatcher;
use Log;

class NewMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
        // dd($message);
        $this -> message = $message;
    }



    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        //\Log::info('channel');
        //return new PrivateChannel('App.user.'.$this -> message -> user_id);
       return new Channel('test');

    }

    /*public function broadcastAs()
{
    return 'chat-event';
}*/
    public function broadcastWith(){
        return [
            'message' => $this -> message ->load([
                'from' => function ($query){
                    $query -> select('id','nom','prenom');
                }
            ])->toArray()
        ];
    }


    /*public function broadcastAs()
    {
        return 'server.created';
    }*/
}
