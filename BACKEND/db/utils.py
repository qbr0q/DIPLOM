def commit_data(session, data):
    session.add(data)
    new_id = session.commit()
    return new_id
