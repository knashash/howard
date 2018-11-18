@extends('layouts.main')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Tutor Application</div>

                <div class="card-body">
                    <form class="form-horizontal" onSubmit={this.handleCreateNewProject}>
                        <div class="form-group">
                            <div class="form-group row">
                                <div class="col-md-4">
                                    <label for="firstName">First Name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="">
                                </div>
                                <div class="col-md-4">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" class="form-control" id="lastName" placeholder="">
                                </div>
                                <div class="col-md-4">
                                    <label for="lastName">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="adress">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="">
                        </div>

                        <div class="form-group">
                            <div class="form-group row">
                                <div class="col-md-6">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="city" placeholder="">
                                </div>
                                <div class="col-md-2">
                                    <label for="state">State</label>
                                    <input type="state" class="form-control" id="state" placeholder="">
                                </div>
                                <div class="col-md-4">
                                    <label for="zipcode">Zipcode</label>
                                    <input type="zipcode" class="form-control" id="zipcode" placeholder="">
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
