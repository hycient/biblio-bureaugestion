package org.bureaugestion.biblio.models;

import java.util.ArrayList;
import java.util.List;

public class Response {

    // ----------------- propriétés
    // statut de l'opération
    private int status;
    // la réponse JSON
    private Object data;
    // messages
    private List<String> messages;

    // ---------------constructeurs
    public Response() {
    }

    public Response(int status, Object data) {
        this.status = status;
        this.data = data;
        messages = new ArrayList<String>();
    }

    // méthodes
    public void incrStatusBy(int increment) {
        status += increment;
    }

    // ----------------------getters et setters
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

}
